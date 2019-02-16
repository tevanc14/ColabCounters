import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Collaborator, Counter } from "src/app/shared/model/counter";
import { User } from "src/app/shared/model/user";
import { CounterService } from "src/app/shared/service/counter/counter.service";
import { UserService } from "src/app/shared/service/user/user.service";

export interface DialogData {
  counter: Counter;
}

export interface CollaboratorConfiguration {
  canWrite: boolean;
  canShare: boolean;
  canDelete: boolean;
}

@Component({
  selector: "app-collaborator-dialog",
  templateUrl: "./collaborator-dialog.component.html",
  styleUrls: ["./collaborator-dialog.component.scss"]
})
export class CollaboratorDialogComponent implements OnInit {
  collaboratorUsers$: Observable<User[]>;
  collaboratorIds: string[];
  counter: Counter;
  users$: Observable<User[]>;

  collaboratorConfiguration: CollaboratorConfiguration;

  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailControl = new FormControl();
  filteredEmails: Observable<string[]>;
  emailsToBeAdded: string[] = [];
  allEmails: string[] = [];

  editingExistingCollaborator = false;
  oldCollaboratorConfiguration: CollaboratorConfiguration;
  selectedUser: User;

  @ViewChild("collaboratorInput") collaboratorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(
    public userService: UserService,
    public counterService: CounterService,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.counter = this.data.counter;
    this.users$ = this.userService.subscribeToUserService();
    this.collaboratorIds = this.getCollaboratorIds();
    this.collaboratorUsers$ = this.getCollaborators();
    this.allEmails = this.getEmailsFromUsers();
    this.filteredEmails = this.initializeFilteredEmails();
    this.collaboratorConfiguration = this.defaultCollaboratorConfiguration();
    this.oldCollaboratorConfiguration = this.defaultCollaboratorConfiguration();
  }

  initializeFilteredEmails(): Observable<string[]> {
    return this.emailControl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => {
        return email ? this.filterEmails(email) : this.allEmails.slice();
      }),
      map(emails => {
        return emails.filter(email => {
          return !this.emailsToBeAdded.includes(email);
        });
      })
    );
  }

  defaultCollaboratorConfiguration(): CollaboratorConfiguration {
    return {
      canWrite: true,
      canShare: true,
      canDelete: false
    };
  }

  getCollaboratorIds(): any[] {
    const collaboratorIds = [];

    for (const collaborator of this.counter.collaborators) {
      collaboratorIds.push(collaborator.userId);
    }

    return collaboratorIds;
  }

  getCollaborators(): Observable<User[]> {
    return this.users$.pipe(
      map(users => {
        return users.filter(user => {
          return this.collaboratorIds.includes(user.userId);
        });
      })
    );
  }

  addCollaborators(): void {
    if (this.emailsToBeAdded.length === 0) {
      return;
    }

    this.users$.subscribe((users: User[]) => {
      this.emailsToBeAdded.forEach(email => {
        const user = this.getUserFromEmail(email, users);
        this.counterService.addCollaborator(
          this.counter.counterId,
          this.buildCollaborator(user.userId, this.collaboratorConfiguration)
        );
      });
    });

    this.dialogRef.close(`${this.emailsToBeAdded.length} collaborators added`);
  }

  getUserFromEmail(emailAddress: string, users: User[]): User {
    return users.find((user: User) => {
      return (
        !this.isExistingCollaborator(user) &&
        user.emailAddress === emailAddress &&
        user.userId !== this.userService.currentUser.userId
      );
    });
  }

  isCreator(user: User): boolean {
    return user.userId === this.counter.createdBy;
  }

  isExistingCollaborator(user: User): boolean {
    return this.collaboratorIds.includes(user.userId);
  }

  getEmailsFromUsers(): string[] {
    const emails: string[] = [];
    this.userService.users$.subscribe(users => {
      for (const user of users) {
        if (!this.isExistingCollaborator(user)) {
          emails.push(user.emailAddress);
        }
      }
    });
    return emails;
  }

  addCollaboratorEmail(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        this.emailsToBeAdded.push(value.trim());
      }

      if (input) {
        input.value = "";
      }

      this.emailControl.setValue(null);
    }
  }

  removeCollaboratorEmail(email: string): void {
    this.autocomplete.closePanel();

    const index = this.emailsToBeAdded.indexOf(email);
    if (index >= 0) {
      this.emailsToBeAdded.splice(index, 1);
      this.emailControl.setValue(null);
    }
  }

  selectCollaboratorEmail(event: MatAutocompleteSelectedEvent): void {
    this.emailsToBeAdded.push(event.option.viewValue);
    this.collaboratorInput.nativeElement.value = "";
    this.emailControl.setValue(null);
  }

  filterEmails(value: string): string[] {
    return this.allEmails.filter(email => {
      return email.indexOf(value) === 0;
    });
  }

  editButtonClick(user: User): void {
    if (this.editingExistingCollaborator) {
      this.cancelEditing();
    } else {
      this.editCollaborator(user);
    }
  }

  editCollaborator(user: User): void {
    this.selectedUser = user;
    const collaborator = this.getCollaborator(user.userId);
    this.populateCollaboratorConfiguration(collaborator);
    Object.assign(
      this.oldCollaboratorConfiguration,
      this.collaboratorConfiguration
    );
    this.editingExistingCollaborator = true;
  }

  getCollaborator(userId: string): Collaborator {
    return this.counter.collaborators.find((collaborator: Collaborator) => {
      return collaborator.userId === userId;
    });
  }

  populateCollaboratorConfiguration(collaborator: Collaborator): void {
    this.collaboratorConfiguration.canWrite = collaborator.canWrite;
    this.collaboratorConfiguration.canShare = collaborator.canShare;
    this.collaboratorConfiguration.canDelete = collaborator.canDelete;
  }

  cancelEditing(): void {
    Object.assign(this.oldCollaboratorConfiguration, {});
    this.editingExistingCollaborator = false;
    Object.assign(
      this.collaboratorConfiguration,
      this.defaultCollaboratorConfiguration()
    );
  }

  updateCollaborator(): void {
    const oldCollaborator = this.buildCollaborator(
      this.selectedUser.userId,
      this.oldCollaboratorConfiguration
    );
    const newCollaborator = this.buildCollaborator(
      this.selectedUser.userId,
      this.collaboratorConfiguration
    );
    this.counterService.updateCollaborator(
      this.counter.counterId,
      oldCollaborator,
      newCollaborator
    );
    this.dialogRef.close(
      `${this.selectedUser.emailAddress} privileges updated`
    );
  }

  buildCollaborator(
    userId: string,
    configuration: CollaboratorConfiguration
  ): Collaborator {
    return new Collaborator(
      userId,
      true,
      configuration.canWrite,
      configuration.canShare,
      configuration.canDelete
    );
  }

  removeCollaborator(): void {
    this.counterService.removeCollaborator(
      this.counter.counterId,
      this.buildCollaborator(
        this.selectedUser.userId,
        this.collaboratorConfiguration
      )
    );
    this.dialogRef.close(
      `${this.selectedUser.emailAddress} removed from the "${
        this.counter.name
      }" counter`
    );
  }
}
