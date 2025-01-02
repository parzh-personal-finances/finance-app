-- Group balance events by entity, order by transaction timestamp
create or replace view balance_event_by_entity
as
  select
    balance_event.*,
    (-1) + row_number() over (
      partition by
        entity_id
      order by
        "transaction".transaction_timestamp desc
    )
      as balance_event_next_events_count
  from
    balance_event
    natural inner join "transaction"
  order by
    entity_id,
    balance_event_next_events_count
;
