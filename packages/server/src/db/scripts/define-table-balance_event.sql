create table if not exists balance_event (
  transaction_id
    varchar(36) not null
    references "transaction"(transaction_id),

  entity_id
    varchar(36) not null
    references entity(entity_id),

  entity_balance
    decimal(10, 2) not null,

  primary key (transaction_id, entity_id)
);
