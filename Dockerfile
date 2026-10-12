FROM public.ecr.aws/d3j8x8q7/olympus-base-typescript:latest

WORKDIR /app

COPY . .

RUN corepack enable && pnpm install --frozen-lockfile

CMD ["/bin/bash"]