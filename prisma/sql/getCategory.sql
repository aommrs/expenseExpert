select c.id
, c."categoryName"
, c.emoji
, t.id as "typeId"
, t."typeCode" 
, t."typeName"
from category c
join type t on c."typeId" = t.id
order by c.id asc