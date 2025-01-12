select tst.id
, tst."transactionCode"
, tst."transactionDesc"
, TO_CHAR(tst.amount, 'FM999999999.00') AS amount
, tst."transDate"
, case
        when to_char(tst."transDate" + interval '1 day', 'dd/mm/yyyy') = to_char(now(), 'dd/mm/yyyy') 
        then 'today'
        else to_char(tst."transDate" + interval '1 day', 'dd/mm/yyyy')
    end as "date"
, c.id as "categoryId"
, c.emoji
, c."categoryName"
, t."typeCode"
, t."typeName"
from transaction tst
join category c on tst."categoryId" = c.id
join type t on c."typeId" = t.id
order by tst."transDate" desc