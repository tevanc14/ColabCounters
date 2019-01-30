import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from "@angular/material";
import { Counter, Collaborator } from "src/app/shared/model/counter";
import { UserService } from "src/app/shared/services/user/user.service";
import { User } from "src/app/shared/model/user";
import { CounterService } from "src/app/shared/services/counter-service/counter.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";

export interface DialogData {
  counter: Counter;
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

  collaboratorConfiguration = {
    canRead: true,
    canShare: true,
    canWrite: true
  };

  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailControl = new FormControl();
  filteredEmails: Observable<string[]>;
  emailsToBeAdded: string[] = [];
  allEmails: string[] = [];

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
  ) {
    this.counter = this.data.counter;
    this.users$ = this.userService.subscribeToUserService();
    this.collaboratorIds = this.getCollaboratorIds();
    this.collaboratorUsers$ = this.getCollaborators();
    this.allEmails = this.getEmailsFromUsers();
    this.filteredEmails = this.initializeFilteredEmails();
  }

  ngOnInit() {}

  initializeFilteredEmails() {
    return this.emailControl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => {
        return email ? this.filterEmails(email) : this.allEmails.slice();
      }),
      // TODO: See if can combine with other map
      map(emails => {
        return emails.filter(email => {
          return !this.emailsToBeAdded.includes(email);
        });
      })
    );
  }

  getCollaboratorIds() {
    const collaboratorIds = [];

    for (const collaborator of this.counter.collaborators) {
      collaboratorIds.push(collaborator.userId);
    }

    return collaboratorIds;
  }

  getCollaborators() {
    return this.users$.pipe(
      map(users => {
        return users.filter(user => {
          return this.collaboratorIds.includes(user.userId);
        });
      })
    );
  }

  addCollaborators() {
    this.users$.subscribe((users: User[]) => {
      this.emailsToBeAdded.forEach(email => {
        const user = this.getUserFromEmail(email, users);
        this.counterService.addCollaborator(
          this.counter.counterId,
          new Collaborator(
            user.userId,
            this.collaboratorConfiguration.canRead,
            this.collaboratorConfiguration.canWrite,
            this.collaboratorConfiguration.canShare
          )
        );
      });
    });

    this.dialogRef.close();
  }

  getUserFromEmail(emailAddress: string, users: User[]): any {
    for (const user of users) {
      if (
        !this.isExistingCollaborator(user) &&
        user.emailAddress === emailAddress &&
        user.userId !== this.userService.user.userId
      ) {
        return user;
      }
    }
  }

  isCreator(user: User) {
    return user.userId === this.counter.createdBy;
  }

  isExistingCollaborator(user: User) {
    return this.collaboratorIds.includes(user.userId);
  }

  getEmailsFromUsers() {
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
}
