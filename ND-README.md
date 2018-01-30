# ND Specific instructions

## Installation

1. Clone repository
2. Follow the instructions in the [README](README.md) With the exception of step 9 and 10.

## Running the app

1. gulp run --view NDU
2. go to localhost:8003/primo-explore/?vid=NDU  

## Comiting changes workflow

1. Branch off of master.
2. Make your changes.
3. Make a PR against UA (the current default branch)
4. When it is approved deploy UA branch to pprd.
5. when it is approved update the Changelog.
6. Make PR against Master.  


## UA Deploy Instructions

1. Run gulp create-package on the UA branch.
2. Select the package you want to create NDU or HCC.
3. Install the file in back office as in [README](README.md)


## Prod Deploy Instructions

1. Tag the repo with the release number
2. Run gulp create-package on the release tag
2. Select the package you want to create NDU or HCC.
5. Install the file in back office as in [README](README.md)