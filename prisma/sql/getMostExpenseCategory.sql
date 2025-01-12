select sum(tst.amount) as "totalAmount"
, c."categoryName"
from transaction tst
join category c on tst."categoryId" = c.id
join type t on c."typeId" = t.id
where date_trunc('month', tst."transDate" + interval '1 day') = date_trunc('month', to_date($1, 'MM/YYYY'))
and t."typeCode" not in ('01', '03')
group by c."categoryName"