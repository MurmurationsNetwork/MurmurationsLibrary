TAG ?= $(shell git rev-parse --short ${GITHUB_SHA})$(and $(shell git status -s),-dirty)

docker-build:
	docker build -f Dockerfile -t murmurations/cdn .

docker-tag: docker-build
	docker tag murmurations/cdn murmurations/cdn:${TAG}

docker-push: docker-build
	docker push murmurations/cdn:latest
	docker push murmurations/cdn:$(TAG)

deploy:
	helm upgrade murmurations-cdn ./murmurations-cdn --set image=murmurations/cdn:latest --install --atomic
