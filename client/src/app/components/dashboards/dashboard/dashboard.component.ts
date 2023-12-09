import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GeneralUserData} from "@models/stats-dtos/general-user-data";
import {UserService} from "@services/user.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userId: string | undefined;
  generalUserData: GeneralUserData | undefined;
  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId') as string;
    });
    this.userService.getGeneralUserData(this.userId as string).subscribe({
      next: (data) => {
        this.generalUserData = data;
      },
      error: (err) => console.error(`Fetching general user data(id: ${this.userId}) failed: ${err})`)
    })
  }
}
