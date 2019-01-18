export class User {
    public name: string;
    public description: string;
    public role: string;
    public country: string;
    public password: string;
    public username: string;
    public validity: Boolean = false;
    public canEdit: Boolean = false;
    public canObserve: Boolean = false;

    constructor(name: string, username: string, password: string, desc: string, role: string, country: string) {
      this.name = name;
      this.username = username;
      this.password = password;
      this.description = desc;
      this.role = role;
      this.country = country;
      this.checkNullValues();
      this.grantAcces();
    }

    checkNullValues() {
      let auxiliar = true;
      for (const key in this) {
        if (this.hasOwnProperty(key)) {
          const element = this[key];
          if (element === null || element === undefined) {
            auxiliar = false;
            break;
          }
        }
      }
      this.validity = auxiliar;
    }

    grantAcces() {
      switch (this.role) {
        case 'ADMINISTRATOR':
          this.canEdit = this.canObserve = true;
          break;
        case 'OBSERVER':
          this.canEdit = false;
          this.canObserve = true;
          break;
        default:
          this.canEdit = this.canObserve = false;
          break;
      }
    }
  }
