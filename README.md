
<pre lang="markdown"> ```
security-events-api/
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ ├── common/
│ │ └── filters/
│ │ └── http-exception.filter.ts
│ ├── config/
│ │ └── config.service.ts
│ ├── security-events/
│ │ ├── dto/
│ │ │ ├── create-security-event.dto.ts
│ │ │ ├── security-event-query.dto.ts
│ │ │ └── security-event-summary.dto.ts
│ │ ├── entities/
│ │ │ └── security-event.entity.ts
│ │ ├── security-events.controller.ts
│ │ ├── security-events.module.ts
│ │ ├── security-events.service.ts
│ │ └── security-events.gateway.ts
│ └── email/
│ ├── email.module.ts
│ └── email.service.ts
├── prisma/
│ └── schema.prisma
├── .env
├── package.json
└── tsconfig.json

``` </pre>