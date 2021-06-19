# sls-hello-deno

## docker-lambda

### direct run

```
❯ docker run -it --rm -v "$PWD":/var/task:ro,delegated -v "$PWD"/deno-lambda-layer:/opt:ro,delegated lambci/lambda:provided.al2 api/hello.handler '{}'

(...)

{"statusCode":200,"headers":{"content-type":"text/html;charset=utf8"},"body":"{\"message\": \"Welcome to deno 1.11.0 🦕\",\"input\": {}}"}
```

### stay-open mode

terminal #1:

```
❯ docker run -e DOCKER_LAMBDA_STAY_OPEN=1 -p 9001:9001 -it --rm -v "$PWD":/var/task:ro,delegated -v "$PWD"/deno-lambda-layer:/opt:ro,delegated lambci/lambda:provided.al2 api/hello.handler
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
Lambda API listening on port 9001...
```

terminal #2:

```
❯ aws lambda invoke --endpoint http://localhost:9001 --cli-binary-format raw-in-base64-out --no-sign-request --function-name deno-func --payload '{"message":"hello from aws-cli"}' output.json
{
  "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}

❯ cat output.json
{"statusCode":200,"headers":{"content-type":"text/html;charset=utf8"},"body":"{\"message\":\"Welcome to deno 1.11.0 🦕\",\"input\":{\"message\":\"hello from aws-cli\"}}"}
```
