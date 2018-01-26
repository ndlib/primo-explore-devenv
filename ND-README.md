# ND Specific instructions

## Installation

1. Clone repository
2. Follow the instructions in the [README](README.md) With the exception of step 9 and 10.

## Running the app

1. gulp run --view NDU
2. go to localhost:8003/primo-explore/?vid=NDU  

## Comiting changes.
1. Branch off of master.
2. Make your changes.
3. Make a PR against UA.
4. Deploy UA branch to pprd.
5. Update the Changelog.
6. Upon Approval PR against Master.  


## UA Deploy Instructions

1. Run gulp create-package on the UA branch.
2. Select the package you want to create NDU or HCC.
3. Install the file in back office as in [README](README.md)


## Prod Deploy Instructions

1. Run gulp create-package on the master branch.
2. Select the package you want to create NDU or HCC.
3. Add the release number to the file and move to the archive directory.
4. Check the file in.
5. Install the file in back office as in [README](README.md)
