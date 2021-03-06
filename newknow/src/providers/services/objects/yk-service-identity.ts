/**
 * Class representing the identity of a YouKnow service
 */
export class YkServiceIdentity {

  /**
   * Internal id assigned by YouKnow to the service
   */
  public id: number = -1;

  /**
   * Common name of the service.
   */
  public name: string = '';

  /**
   * Desccription of the service.
   */
  public description: string = '';

  /**
   * Author of the service.
   */
  public author: string = '';

  /**
   * Current version of the service.
   */
  public version: string = '';

  /**
   * Public contact email adress for the service.
   */
  public contact: string = '';

  constructor() {}

  /**
   * Log the identity
   */
  log() {
    console.log('Name : ', this.name);
    console.log('Description : ', this.description);
    console.log('Author : ', this.author);
    console.log('Version : ', this.version);
    console.log('Contact : ', this.contact);
  }
}
