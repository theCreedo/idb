# Insert makefile info

.DEFAULT_GOAL := test

FILES :=                              \
    app/models.py                     \
	app/tests.py                      \
	.gitignore                        \
	.travis.yml                       \
	
	# IDB1.pdf                          \
	# IDB1.html                         \
	# IDB1.log                          \

ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(CI), true)                # Travis CI
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(shell uname -p), unknown) # Docker
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint3
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
endif

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

# collatz-tests:
# 	git clone https://github.com/cs373t-spring-2017/collatz-tests.git

# Collatz.html: Collatz.py
# 	pydoc3 -w Collatz

# Collatz.log:
# 	git log > Collatz.log

# RunCollatz.tmp: Collatz.py RunCollatz.in RunCollatz.out RunCollatz.py .pylintrc
# 	-$(PYLINT) Collatz.py
# 	-$(PYLINT) RunCollatz.py
# 	$(PYTHON) RunCollatz.py < RunCollatz.in > RunCollatz.tmp
# 	diff RunCollatz.tmp RunCollatz.out

# TestCollatz.tmp: Collatz.py TestCollatz.py .pylintrc
# 	-$(PYLINT) TestCollatz.py
# 	$(COVERAGE) run    --branch TestCollatz.py >  TestCollatz.tmp 2>&1
# 	$(COVERAGE) report -m                      >> TestCollatz.tmp
# 	cat TestCollatz.tmp

check:
	@not_found=0;                                 \
    for i in $(FILES);                            \
    do                                            \
        if [ -e $$i ];                            \
        then                                      \
            echo "$$i found";                     \
        else                                      \
            echo "$$i NOT FOUND";                 \
            not_found=`expr "$$not_found" + "1"`; \
        fi                                        \
    done;                                         \
    if [ $$not_found -ne 0 ];                     \
    then                                          \
        echo "$$not_found failures";              \
        exit 1;                                   \
    fi;                                           \
    echo "success";

# clean:
# 	rm -f  .pylintrc
# 	rm -rf __pycache__

config:
	git config -l

# format:
# 	$(AUTOPEP8) -i Collatz.py
# 	$(AUTOPEP8) -i RunCollatz.py
# 	$(AUTOPEP8) -i TestCollatz.py

status:
	git branch
	git remote -v
	git status
# 	make clean

test:
	ls -al
	make check

versions:
	which make
	make --version
	@echo
	which git
	git --version
	@echo
	which $(PYTHON)
	$(PYTHON) --version
	@echo
	which $(PIP)
	$(PIP) --version
	@echo
	which $(PYLINT)
	$(PYLINT) --version
	@echo
	which $(COVERAGE)
	$(COVERAGE) --version
	@echo
	-which $(PYDOC)
	-$(PYDOC) --version
	@echo
	which $(AUTOPEP8)
	$(AUTOPEP8) --version
	@echo
	$(PIP) list
