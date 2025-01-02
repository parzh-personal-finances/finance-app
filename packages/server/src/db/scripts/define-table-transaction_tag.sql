create table if not exists transaction_tag (
  transaction_id
    varchar(36) not null
    references "transaction"(transaction_id),

  tag_body
    varchar(31) not null
    references tag(tag_body),

  primary key ()
);
