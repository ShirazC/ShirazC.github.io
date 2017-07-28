# README

This project addresses Section 3.10 of RFI HSSCCG-17-I-00019:

> Build an AI (neural network) application using Google's [dataset for document entity resolution](https://code.google.com/archive/p/wiki-links/downloads). Provide the code via GIT for review, login information to view a dashboard of statistics describing the application’s performance (i.e. precision and recall, combined MAP rate), and some method of visualization that provides meaningful comprehension and interpretability to conceptual clusters and other data relevant towards understanding features of entities and data quality. Please provide the government with the credentials to access the code for review and testing purposes.

## Summary of contents

- `README.md`: this file
- `approach.txt`: pseudocode of a potential solution to the problem presented
- `convert.py`: a Python program which takes the TSV files provided by Google and reorganizes them into JSON files for use in the psudocode above

## Addressing the problem

There are two major types of using machine learning: **classification** and **clustering**. [The data provided](https://code.google.com/archive/p/wiki-links/downloads) indicates that there is no prediction needed to analyze the data. Rather, the data and task call for a relation-based traversal that clusters similar articles in groups based on similarity of keywords. Here is a piece of the data:

	URL	ftp://212.18.29.48/ftp/pub/allnet/nas/all60300/ALL60300_UM_V12_EN.pdf\
	MENTION	r NetBIOS	176937	http://en.wikipedia.org/wiki/NetBIOS\
	TOKEN	acting	304940
	TOKEN	whose	247626
	TOKEN	capabilities	70039
	TOKEN	ME	201398
	TOKEN	calls	514390
	TOKEN	preferably	346689
	TOKEN	functionality	358183
	TOKEN	anything	7034
	TOKEN	boost	508294
	TOKEN	enjoying	211878

The most important pieces of the data are the `URL` and the `MENTION`. The `TOKEN`s are only needed for version control for the specific article linked through the `URL`. In graph-based machine learning it is important to note the graph's fundamental structure:

![Figure 1](https://image.slidesharecdn.com/graphbaseddatamodels-170102102318/95/graph-based-data-models-46-638.jpg?)

Each node represents the data that you want to analyze, and each edge represents the relationship that is shared between the nodes, and the labels describe what the node is. In graph-based machine learning, it is important to make sure the data are displayed mainly through nodes, as it improves human-readability. As such, there should be two labels: `URL`s (articles), and `MENTION`s (the keywords in the articles). The edges have relatively little information and will only represent that a given `URL` "contains a `MENTION`." In our graph, the edge will point from the URL to a specific mention indicating that the `URL` contains that `MENTION` (Figure 2).

![Figure 2](http://shirazchokshi.com/FullSizeRender.jpg)

Before creating a graph with the aforementioned criteria, it is important to note the structure of the data. Due to its unconventional tab separated structure and its variability (each `URL` can have multiple `MENTION`s), we need to reform the data into something that would be more readable for data processing. As a result, we decided to convert the data structure from tab separated values to JavaScript Object Notation (JSON). The conversion consolidates `MENTION`s and discards `TOKEN`s. As an example, the following entry:

	URL	ftp://38.107.129.5/Training/Training%20Documentation/Latitude%20V6.2%20Training%20Binder/06%20Latitude%206%202%20Release%20Notes_Build%2027.pdf
	MENTION	Microsoft	80679	http://en.wikipedia.org/wiki/Microsoft
	MENTION	Microsoft	134415	http://en.wikipedia.org/wiki/Microsoft
	MENTION	Windows Server 2008	80862	http://en.wikipedia.org/wiki/Windows_Server_2008
	MENTION	Windows Server 2008	134744	http://en.wikipedia.org/wiki/Windows_Server_2008
	MENTION	Windows 7	81028	http://en.wikipedia.org/wiki/Windows_7
	MENTION	Windows 7	134910	http://en.wikipedia.org/wiki/Windows_7
	MENTION	operating systems.	81109	http://en.wikipedia.org/wiki/Operating_system
	MENTION	Windows Vista	134573	http://en.wikipedia.org/wiki/Windows_Vista
	TOKEN	Fresh	54828
	TOKEN	evidence	32081
	TOKEN	Allow	72597
	TOKEN	operator	148693
	TOKEN	notice	507684
	TOKEN	save	77567
	TOKEN	subfolder	154988
	TOKEN	PELCO	490470
	TOKEN	crashed	301434
	TOKEN	audit	296060

is transformed thus:

	"ftp://38.107.129.5/Training/Training%20Documentation/Latitude%20V6.2%20Training%20Binder/06%20Latitude%206%202%20Release%20Notes_Build%2027.pdf": {
		"http://en.wikipedia.org/wiki/Microsoft": "Microsoft",
		"http://en.wikipedia.org/wiki/Operating_system": "operating systems.",
		"http://en.wikipedia.org/wiki/Windows_7": "Windows 7",
		"http://en.wikipedia.org/wiki/Windows_Server_2008": "Windows Server 2008",
		"http://en.wikipedia.org/wiki/Windows_Vista": "Windows Vista"
	}

where each `URL` is identified by its unique value and each associated `MENTION` is similarly idenfified.

Now that the data are in a more readable format, we have to create relationships between all the entities, a process known as entity resolution. [Here](http://cs.umd.edu/~bengfort/tutorials/entity-resolution-for-big-data/), researchers at the University of Maryland found that two sub-algorithms of entity resolution are *NP*-Hard. *NP*-Hard refers to the time it takes for an algorithm to finish. For example, an algorithm that counts the number of elements in a list would be *O(N)*, where *N* is the number of elements. When refering to complexity, there are several types of complexity ranging from *O(N)* to *O(N^2)* to *O(NP)*. *O(NP)* is the time it takes for an algorithm to finish in polynomial time. *NP*-Hard refers to the most difficult polynomial functions.

This creates a problem for analyzing the entire dataset. As a result, we have created a high-level algorithmic approach (see `approach.txt`): after creating a graphical representation of all the nodes and edges, we would Means Shift, a clustering algorithm, to cluster all the data into similar groups based on their relationships.
