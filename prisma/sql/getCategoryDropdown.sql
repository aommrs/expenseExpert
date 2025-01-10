select c.id as value
, concat(c.emoji, ' ', c."categoryName") as text
from category c
order by c.id asc