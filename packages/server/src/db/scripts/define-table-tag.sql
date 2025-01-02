create table if not exists tag (
  tag_body
    varchar(31)
    primary key,

  tag_group_name
    varchar(31),

  unique (tag_body, tag_group_name)
);
