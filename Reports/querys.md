# Insira aqui as query utilizadas

## Todas as agendas

```sql
SELECT * FROM schedules;
```

## Todas as agendas com a tag "Dev"

```sql
SELECT schedules.*
FROM schedules
INNER JOIN schedule_tags ON schedules.id = schedule_tags.schedule_id
WHERE schedule_tags.tag_id = 1;
```

## Todas as agendas que acontecerão no dia 10 de maio

```sql
SELECT schedules.*
FROM schedules
WHERE schedules.start_time = '2023-05-10 08:00:00.000 -03:00';;
```

## Todas as agendas que o usuário Luís participou

```sql
SELECT schedules.*
FROM schedules
INNER JOIN schedule_users ON schedules.id = schedule_users.schedule_id
WHERE schedule_users.user_id = 9;
```
