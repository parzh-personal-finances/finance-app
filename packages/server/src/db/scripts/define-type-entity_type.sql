do $$
begin
  create type entity_type as enum(
    'account',
    'category_expense',
    'category_income',
    'person'
  );
exception
  when duplicate_object then null;
end $$;
