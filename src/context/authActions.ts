export enum AuthActionEnum {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  ADMIN_LOG_IN = 'ADMIN_LOG_IN',
  ADMIN_LOG_OUT = 'ADMIN_LOG_OUT'
}

export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN;
      payload: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        authToken: string;
        refreshToken: string;
      };
    }
  | {
      type: AuthActionEnum.LOG_OUT;
      payload: null;
    }
  | {
      type: AuthActionEnum.ADMIN_LOG_IN;
      payload: {
        id: string;
        email: string;
        role: string;
        authToken: string;
        refreshToken: string;
      };
    }
  | {
      type: AuthActionEnum.ADMIN_LOG_OUT;
      payload: null;
    };
