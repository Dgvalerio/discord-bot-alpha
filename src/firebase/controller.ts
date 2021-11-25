import axios, { AxiosResponse } from 'axios';
import { differenceInMinutes, format } from 'date-fns';

import {
  OpenAppointment,
  Appointment,
  CreateAppointment,
  CloseAppointment,
  UpdateAppointment,
  TodayAppointments,
} from './types';

/**
 * @module FirebaseController
 * */
export class FirebaseController {
  private axios;
  private path = '/appointments';

  /**
   * Constructor of FirebaseController
   * */
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://discord-timesheet-bot-default-rtdb.firebaseio.com/',
    });
  }

  /**
   * Method to open a Appointment
   * @param {OpenAppointment.Params} attributes - attributes of Appointment.
   * @return {Promise<OpenAppointment.Response>}
   * */
  public async openAppointment(
    attributes: OpenAppointment.Params
  ): Promise<OpenAppointment.Response> {
    const allAppointments = await this.listAppointments();

    const existentAppointment = allAppointments.find(
      (appointment) =>
        appointment.user === attributes.user && !appointment.close
    );

    if (existentAppointment) {
      const activeTime = differenceInMinutes(
        new Date(),
        new Date(existentAppointment.start)
      );

      const minutes = activeTime % 60;
      const hours = (activeTime - minutes) / 60;

      return {
        failure: {
          messages: [
            `Já existe um apontamento ativo à ${hours} horas e ${minutes} minutos.`,
            format(
              new Date(existentAppointment.start),
              "'O apontamento foi criado' dd/MM/yyyy 'às' hh:mm'.'"
            ),
            '\n',
            'Se desejar, tente encerrar com: ```fix\n/close\n```',
          ],
        },
      };
    } else {
      const create = await this.createAppointment(attributes);

      return { success: create };
    }
  }

  /**
   * Method to close a Appointment
   * @param {OpenAppointment.Params} attributes - attributes of Appointment.
   * @return {Promise<CloseAppointment.Response>}
   * */
  public async closeAppointment(
    attributes: CloseAppointment.Params
  ): Promise<CloseAppointment.Response> {
    const allAppointments = await this.listAppointments();

    const existentAppointment = allAppointments.find(
      (appointment) =>
        appointment.user === attributes.user && !appointment.close
    );

    if (existentAppointment) {
      const update = await this.updateAppointment({
        id: existentAppointment.id,
        attributes: { close: new Date(), message: attributes.message },
      });

      return { success: update };
    } else {
      return {
        failure: {
          messages: [
            `Não existe um apontamento ativo.`,
            '\n',
            'Se desejar, tente inciar um com: ```fix\n/start\n```',
          ],
        },
      };
    }
  }

  /**
   * Method to list today Appointments
   * @return {Promise<TodayAppointments.Response>}
   * */
  public async todayAppointments(): Promise<TodayAppointments.Response> {
    const response = await this.listAppointments();

    const today = new Date().getDate();

    return response.filter((res) => res.start.getDate() === today);
  }

  /**
   * Method to create a Appointment
   * @param {CreateAppointment.Params} attributes - attributes of Appointment.
   * @return {Promise<CreateAppointment.Model>}
   * */
  public async createAppointment(
    attributes: CreateAppointment.Params
  ): Promise<CreateAppointment.Model> {
    const { data }: AxiosResponse<{ name: string }> = await this.axios.post(
      this.mountRoute(),
      { ...attributes }
    );

    return this.showAppointment(data.name);
  }

  /**
   * Method to create a Appointment
   * @param {string} id - id of Appointment.
   * @return {Promise<Appointment.Model>}
   * */
  public async showAppointment(id: string): Promise<Appointment.Model> {
    const {
      data: { user, start, close, message },
    }: AxiosResponse<Appointment.Node> = await this.axios.get(
      this.mountRoute(`/${id}`)
    );

    return {
      id,
      user,
      start: new Date(start),
      close: close ? new Date(close) : undefined,
      message,
    };
  }

  /**
   * Method to list a Appointment
   * @return {[Appointment.Model]}
   * */
  public async listAppointments(): Promise<Appointment.Model[]> {
    const { data }: AxiosResponse<Appointment.Node> = await this.axios.get(
      this.mountRoute()
    );

    return FirebaseController.listAdapter<Appointment.Model>(data).map(
      ({ id, user, start, close, message }) => ({
        id,
        user,
        start: new Date(start),
        close: close ? new Date(close) : undefined,
        message,
      })
    );
  }

  /**
   * Method to update a Appointment
   * @param {UpdateAppointment.Params} params - params to update an Appointment
   * @return {Object}
   * */
  public async updateAppointment(
    params: UpdateAppointment.Params
  ): Promise<UpdateAppointment.Model> {
    const { id, attributes } = params;

    await this.axios.patch(this.mountRoute(`/${id}`), {
      ...attributes,
    });

    return this.showAppointment(id);
  }

  /**
   * Method to mount route
   * @param {string} extra - extra value to route
   * @return {string}
   * */
  private mountRoute(extra?: string): string {
    return `${this.path}/${extra || ''}.json`;
  }

  /**
   * Method to convert firebase node in a array of objects
   * @param {object} node - firebase node
   * @return {object[]}
   * */
  private static listAdapter<ObjectType>(node: object): ObjectType[] {
    return Object.entries(node).map(([id, attributes]) => ({
      id,
      ...attributes,
    }));
  }
}
