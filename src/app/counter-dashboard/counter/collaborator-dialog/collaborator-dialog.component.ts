import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Counter, Collaborator } from "src/app/shared/model/counter";
import { UserService } from "src/app/shared/services/user/user.service";
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
  collaboratorUsers: Array<User>;
  collaboratorIds: Array<string>;
  counter: Counter;

  collaboratorConfiguration = {
    emailAddress: "",
    canRead: true,
    canShare: true,
    canWrite: true
  };

  constructor(
    public userService: UserService,
    public counterService: CounterService,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.counter = this.data.counter;
    this.collaboratorIds = this.getCollaboratorIds();
    this.collaboratorUsers = this.getCollaborators();
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
    const collaborators = [];

    for (const user of this.userService.users) {
      if (this.collaboratorIds.includes(user.userId)) {
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
        this.counter.counterId,
        new Collaborator(
          user.userId,
          this.collaboratorConfiguration.canRead,
          this.collaboratorConfiguration.canWrite,
          this.collaboratorConfiguration.canShare
        )
      );

      this.dialogRef.close();
    }
  }

  getUserFromEmail(emailAddress: string): User {
    for (const user of this.userService.users) {
      if (
        !this.collaboratorIds.includes(user.email) &&
        user.email === emailAddress &&
        user.userId !== this.userService.user.userId
      ) {
        return user;
      }
    }
  }

  populateConfiguration(user: User) {
    const collaborator = this.getCollaboratorFromUser(user);
    this.collaboratorConfiguration.emailAddress = user.emailAddress;
    this.collaboratorConfiguration.canRead = collaborator.canRead;
    this.collaboratorConfiguration.canWrite = collaborator.canWrite;
    this.collaboratorConfiguration.canShare = collaborator.canShare;
  }

  getCollaboratorFromUser(user: User): Collaborator {
    for (const collaborator of this.counter.collaborators) {
      if (collaborator.userId === user.userId) {
        return collaborator;
      }
    }
  }

  isCreator(user: User) {
    return user.userId === this.counter.createdBy;
  }
}
