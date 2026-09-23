---
description: Verifica los acceptance criteria del spec indicado. Usa el agente spec-verifier (Playwright + Context7 + build/lint) y edita specs/<name>.md marcando [x] los criterios que pasan, con notas inline para los que fallan.
agent: spec-verifier
subtask: true
---

Ruta del spec a verificar: $ARGUMENTS

(Si está vacío, usa el spec más reciente bajo `specs/` que no sea `template.md` ni `.spec-config.yml`.)
