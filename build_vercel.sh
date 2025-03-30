#!/bin/bash
echo "Current branch: $VERCEL_GIT_COMMIT_REF"
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "dev" ]]; then 
  echo "Branch is main or dev: $VERCEL_GIT_COMMIT_REF"
  exit 0
else 
  echo "Branch is not main or dev, skipping build."
  exit 1
fi