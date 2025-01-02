-- Get IDs of all transactions that have tags along with the tags (each prefixed by group name)
create or replace view transaction_id_to_transaction_tags_prefixed
as
  select
    transaction_id,
    array_agg(
      concat(
        coalesce(tag_group_name, 'global'),
        ':',
        tag_body
      )
    ) as transaction_tags
  from
    transaction_tag
    natural join tag
  group by
    transaction_id
;
