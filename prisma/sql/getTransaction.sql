select tst.id
, tst."transactionCode"
, tst."transactionDesc"
, to_char(tst.amount, 'FM999,999,999.00') as amount
, tst."transDate"
, case
        when to_char(tst."transDate" + interval '1 day', 'dd/mm/yyyy') = to_char(now() + interval '1 day', 'dd/mm/yyyy') 
        then 'วันนี้'
        when to_char(tst."transDate" + interval '1 day', 'dd/mm/yyyy') = to_char(now(), 'dd/mm/yyyy') 
        then 'เมื่อวาน'
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
order by tst."transactionCode" asc
