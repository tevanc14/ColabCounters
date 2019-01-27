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
  MatAutocompleteSelectedEvent
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

  collaboratorConfiguration = {
    canRead: true,
    canShare: true,
    canWrite: true
  };

  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailControl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = [];
  allEmails: string[] = [];

  @ViewChild("collaboratorInput") collaboratorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(
    public userService: UserService,
    public counterService: CounterService,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.counter = this.data.counter;
    this.collaboratorIds = this.getCollaboratorIds();
    this.collaboratorUsers$ = this.getCollaborators();

    this.allEmails = this.getEmailsFromUsers();
    this.filteredEmails = this.emailControl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) =>
        email ? this._filter(email) : this.allEmails.slice()
      )
    );
  }

  ngOnInit() {}

  getCollaboratorIds() {
    const collaboratorIds = [];

    for (const collaborator of this.counter.collaborators) {
      collaboratorIds.push(collaborator.userId);
    }

    return collaboratorIds;
  }

  getCollaborators() {
    return this.userService.users$.pipe(
      map(users => {
        return users.filter(user => {
          return this.collaboratorIds.includes(user.userId);
        });
      })
    );
  }

  addCollaborator() {
    this.emails.forEach(email => {
      this.getUserFromEmail(email).subscribe((user: User) => {
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

  getUserFromEmail(emailAddress: string): Observable<User> {
    return this.userService.users$.pipe(
      map(users => {
        return users.filter(user => {
          return (
            !this.collaboratorIds.includes(user.emailAddress) &&
            user.emailAddress === emailAddress &&
            user.userId !== this.userService.user.userId
          );
        });
      })
    )[0];
  }

  isCreator(user: User) {
    return user.userId === this.counter.createdBy;
  }

  getEmailsFromUsers() {
    const emails: string[] = [];
    this.userService.users$.subscribe(users => {
      for (const user of users) {
        emails.push(user.emailAddress);
      }
    });
    return emails;
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        this.emails.push(value.trim());
      }

      if (input) {
        input.value = "";
      }

      this.emailControl.setValue(null);
    }
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.collaboratorInput.nativeElement.value = "";
    this.emailControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmails.filter(
      email => email.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
