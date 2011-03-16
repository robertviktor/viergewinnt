
This directory contains 'template' projects for each Monkey target type.

These templates are copied into the .build directory associated with each monkey project the first time you build a monkey application.

You can freely edit the projects and code inside the .build directories. Just be careful not to modify anything between any //${BEGIN...} and //${END...} tags, as this is where monkey generated code and data are placed.

You should NOT modify the projects in this directory! Doing so will cause all future projects of that type to 'inherit' these modifications.
