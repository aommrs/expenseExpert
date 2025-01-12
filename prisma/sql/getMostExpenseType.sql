select sum(tst.amount) as "value"
, t."typeName" as "label"
from transaction tst
join category c on tst."categoryId" = c.id
join type t on c."typeId" = t.id
where date_trunc('month', tst."transDate" + interval '1 day') = date_trunc('month', to_date($1, 'MM/YYYY'))
group by t."typeName"