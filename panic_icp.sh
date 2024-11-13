#!/bin/bash
kill -9 $(lsof -t -i:4943) 2>/dev/null && echo "Process killed" || echo "No process found"
