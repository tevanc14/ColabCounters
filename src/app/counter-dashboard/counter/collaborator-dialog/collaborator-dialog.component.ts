import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Counter, Collaborator } from "src/app/shared/model/counter";
import { UserService } from "src/app/shared/services/user/user.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "src/app/shared/model/user";
import { CounterService } from "src/app/shared/services/counter-service/counter.service";

export interface DialogData {
  counter: Counter;
}

@Component({
  selector: "app-collaborator-dialog",
  templateUrl: "./collaborator-dialog.component.html",
  styleUrls: ["./collaborator-dialog.component.scss"]
})
export class CollaboratorDialogComponent implements OnInit {
  users: Array<User>;
  collaboratorIds: Array<string>;

  collaboratorConfiguration = {
    emailAddress: "",
    canDelete: false,
    canRead: false,
    canShare: false,
    canWrite: false
  };

  constructor(
    public userService: UserService,
    public counterService: CounterService,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.collaboratorIds = this.getCollaboratorIds();
    this.users = this.getUsers();
  }

  ngOnInit() {}

  getCollaboratorIds() {
    const collaboratorIds = [];

    for (const collaborator of this.data.counter.collaborators) {
      collaboratorIds.push(collaborator.userId);
    }

    return collaboratorIds;
  }

  getUsers() {
    const collaborators = [];

    for (const user of this.userService.users) {
      if (
        this.collaboratorIds.includes(user.uid) &&
        user.uid !== this.userService.userData.uid
      ) {
        collaborators.push(user);
      }
    }

    return collaborators;
  }

  addCollaborator() {
    const user = this.getUserFromEmail(
      this.collaboratorConfiguration.emailAddress
    );

    if (user) {
      this.counterService.addCollaborator(
        this.data.counter.id,
        new Collaborator(
          user.uid,
          this.collaboratorConfiguration.canRead,
          this.collaboratorConfiguration.canWrite,
          this.collaboratorConfiguration.canShare,
          this.collaboratorConfiguration.canDelete
        )
      );

      this.dialogRef.close();
    }
  }

  getUserFromEmail(emailAddress: string): User {
    for (const user of this.userService.users) {
      if (
        user.email === emailAddress &&
        user.uid !== this.userService.userData.uid
      ) {
        return user;
      }
    }
  }

  populateConfiguration(user: User) {
    const collaborator = this.getCollaboratorFromUser(user);
    this.collaboratorConfiguration.emailAddress = user.email;
    this.collaboratorConfiguration.canRead = collaborator.canRead;
    this.collaboratorConfiguration.canWrite = collaborator.canWrite;
    this.collaboratorConfiguration.canShare = collaborator.canShare;
    this.collaboratorConfiguration.canDelete = collaborator.canDelete;
  }

  getCollaboratorFromUser(user: User): Collaborator {
    for (const collaborator of this.data.counter.collaborators) {
      if (collaborator.userId === user.uid) {
        return collaborator;
      }
    }
  }
}
