-- Get all entities together with their balances
create or replace view entity_with_balance
as
  select
    entity.*,
    balance_event_by_entity.entity_balance
  from
    entity
    natural inner join balance_event_by_entity
  where
    balance_event_by_entity.balance_event_next_events_count = 0
;
