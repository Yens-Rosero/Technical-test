export type EventPayload = {
  Headers: {
    userid: string;
  };
  body: string;
};

export type EventBody = {
  actionid: string;
};

export type ResponseType = {
  statusCode: number;
  body: {
    timestamp?: Date;
    color?: string;
    image?: string;
    result?: object;
    message?: string;
  };
};

export type CalculateResult = {
  result?: number;
  color?: string;
  image?: string;
};

export type Source = {
  result?: number;
};

export type ActionHandler = {
  handle(...sources: any[]): any;
};
