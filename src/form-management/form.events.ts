export class FormCreatedEvent {
  message = 'created'
  constructor(
    public readonly id: string,
  ) {}
}

export class FormUpdatedEvent {
  message = 'updated'
  constructor(
    public readonly id: string,
  ) {}
}

export class FormDeletedEvent {
  message = 'deleted'
  constructor(
    public readonly id: string,
  ) {}
}

export class FormAnsweredEvent {
  message = 'answer created'
  constructor(
    public readonly id: string,
  ) {}
}