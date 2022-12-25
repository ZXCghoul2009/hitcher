export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserRegister extends IUserLogin {
  username: string,
}

export interface IUser extends IUserRegister {
  _id: string,
  isAccepted?: boolean
}

export interface IUpdatePassword {
  oldPassword: string,
  newPassword: string,
  confirmPassword?: string,
  errConfirmPassword?: string
}