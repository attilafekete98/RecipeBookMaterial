import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { NotificationService } from '../shared/notification.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe(
      () => this.notificationService.openSuccess('Fetch successful', 'Close', 2500),
      () => this.notificationService.openError('Fetch unsuccessful', 'Close', 2500)
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
