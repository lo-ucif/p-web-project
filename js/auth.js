const Auth = {
    KEY: 'techstore_user',
    usersKey: 'techstore_users',
    
    getCurrentUser() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : null;
    },
    
    getUsers() {
        const data = localStorage.getItem(this.usersKey);
        return data ? JSON.parse(data) : [];
    },
    
    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    },
    
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            if (user.blocked) {
                return { success: false, message: 'Your account has been blocked.' };
            }
            const userData = { ...user };
            delete userData.password;
            localStorage.setItem(this.KEY, JSON.stringify(userData));
            return { success: true, user: userData };
        }
        
        return { success: false, message: 'Invalid email or password.' };
    },
    
    signup(name, email, password, phone = '') {
        const users = this.getUsers();
        
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered.' };
        }
        
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            phone,
            role: 'client',
            blocked: false,
            createdAt: new Date().toISOString(),
            orders: []
        };
        
        users.push(newUser);
        this.saveUsers(users);
        
        const userData = { ...newUser };
        delete userData.password;
        localStorage.setItem(this.KEY, JSON.stringify(userData));
        
        return { success: true, user: userData };
    },
    
    logout() {
        localStorage.removeItem(this.KEY);
    },
    
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },
    
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },
    
    updateProfile(updates) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;
        
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex > -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            this.saveUsers(users);
            
            const userData = { ...users[userIndex] };
            delete userData.password;
            localStorage.setItem(this.KEY, JSON.stringify(userData));
            return true;
        }
        
        return false;
    },
    
    updatePassword(currentPassword, newPassword) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not logged in.' };
        
        const users = this.getUsers();
        const user = users.find(u => u.id === currentUser.id);
        
        if (!user || user.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        
        user.password = newPassword;
        this.saveUsers(users);
        return { success: true, message: 'Password updated successfully.' };
    },
    
    addOrder(order) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;
        
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex > -1) {
            users[userIndex].orders.push(order);
            this.saveUsers(users);
            
            const userData = { ...users[userIndex] };
            delete userData.password;
            localStorage.setItem(this.KEY, JSON.stringify(userData));
            return true;
        }
        
        return false;
    },
    
    getOrders() {
        const user = this.getCurrentUser();
        return user ? user.orders || [] : [];
    },
    
    protect() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },
    
    protectAdmin() {
        if (!this.isLoggedIn() || !this.isAdmin()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },
    
    updateUI() {
        const user = this.getCurrentUser();
        const authButtons = document.querySelectorAll('.auth-buttons');
        const userDropdown = document.querySelectorAll('.user-dropdown');
        
        authButtons.forEach(container => {
            if (user) {
                container.innerHTML = `
                    <div class="user-menu">
                        <span>Welcome, ${user.name}</span>
                        <a href="profile.html" class="btn btn-sm btn-outline">Profile</a>
                        <button onclick="Auth.logout(); location.reload();" class="btn btn-sm btn-secondary">Logout</button>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <a href="login.html" class="btn btn-sm btn-outline">Login</a>
                    <a href="signup.html" class="btn btn-sm btn-primary">Sign Up</a>
                `;
            }
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
