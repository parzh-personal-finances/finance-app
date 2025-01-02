create table if not exists "transaction" (
  transaction_id
    varchar(36)
    primary key,

  transaction_timestamp
    bigint not null,

  transaction_amount
    decimal(10, 2) not null,

  entity_debit_id
    varchar(36) not null
    references entity(entity_id),

  entity_credit_id
    varchar(36) not null
    references entity(entity_id),

  transaction_refunded_transaction_id
    varchar(36)
    references "transaction"(transaction_id),

  transaction_description
    varchar(255)
);
