select 
    CAST(extract(month from tst."transDate" + interval '1 day') AS integer) as "month",
    sum(case when t."typeCode" in ('01') then tst.amount else 0 end) as "income",
    sum(case when t."typeCode" in ('02') then tst.amount else 0 end) as "expense",
    sum(case when t."typeCode" in ('03') then tst.amount else 0 end) as "invest",
    sum(case when t."typeCode" in ('04') then tst.amount else 0 end) as "tax",
    sum(case when t."typeCode" in ('05') then tst.amount else 0 end) as "saving"
from transaction tst
join category c on tst."categoryId" = c.id
join type t on c."typeId" = t.id
where extract(year from tst."transDate" + interval '1 day') = $1
group by CAST(extract(month FROM tst."transDate" + interval '1 day') AS integer)
order by "month"
