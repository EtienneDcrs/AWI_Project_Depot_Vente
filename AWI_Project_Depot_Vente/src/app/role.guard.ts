import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRoles = route.data['role'] as string[];
        const userRole = this.authService.getCurrentUserRole();

        if (requiredRoles.includes(userRole)) {
            return true;
        }

        this.router.navigate(['/inventaire']);
        return false;
    }
}