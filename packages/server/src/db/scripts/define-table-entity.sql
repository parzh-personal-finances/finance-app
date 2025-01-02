create table if not exists entity (
  entity_id
    varchar(36)
    primary key,

  entity_type
    entity_type not null,

  entity_name
    varchar(255) not null
);
