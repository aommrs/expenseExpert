select to_char(sum(case when t."typeCode" in ('01', '02') then tst.amount else 0 end)
- sum(case when t."typeCode" not in ('01', '02') then tst.amount else 0 end), 'FM999,999,999.00')
as balance
from transaction tst
join category c on tst."categoryId" = c.id
join type t on c."typeId" = t.id
