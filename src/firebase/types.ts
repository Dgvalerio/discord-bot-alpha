export namespace Util {
  export type Success = Appointment.Model;
  export type Failure = {
    messages: string[];
  };

  export type Response =
    | { success: Success; failure?: Failure }
    | { success?: Success; failure: Failure };
}

export namespace Appointment {
  export type Model = {
    id: string;
    message: string;
    user: string;
    start: Date;
    close?: Date;
  };

  export type Node = Omit<Model, 'id'>;
}

// Use Case Types
export namespace OpenAppointment {
  export type Params = {
    user: string;
    start: Date;
  };

  export type Response = Util.Response;
}

export namespace CloseAppointment {
  export type Params = {
    user: string;
    message: string;
  };

  export type Response = Util.Response;
}

// CRUD Types
export namespace CreateAppointment {
  export type Params = {
    user: string;
    start: Date;
  };

  export type Model = Appointment.Model;
}

export namespace UpdateAppointment {
  export type Params = {
    id: string;
    attributes: Partial<Appointment.Node>;
  };

  export type Model = Appointment.Model;
}
