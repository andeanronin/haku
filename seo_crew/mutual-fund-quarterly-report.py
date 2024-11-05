# Quarterly Report Crew from Internal Data 
"""
Quarterly report from haku's internal database. 
Utilizes json search tool to read data and then produces a quarterly report based on data found.
"""

from crewai import Agent, Crew, Process, Task
from crewai_tools import JSONSearchTool, FileWriterTool
from dotenv import load_dotenv

load_dotenv()

# Initialize the JSON Search Tool for mutual fund data analysis
tool = JSONSearchTool(
    json_path='./fondos-mutuos-data.json',
    config={
        "llm": {
            "provider": "openai", 
            "config": {
                "model": "gpt-4o-mini",
            },
        },
        "embedder": {
            "provider": "openai",
            "config": {
                "model": "text-embedding-3-small",
            },
        },
    }
)

# Define Agents
data_analyst = Agent(
    role="Data Analyst",
    goal="Analyze the mutual fund data to extract trends, key performance indicators, and insights.",
    backstory="Experienced financial data analyst specializing in mutual funds in Peru.",
    llm="gpt-4o-mini",
    tools=[tool]
)

report_writer = Agent(
    role="Report Writer",
    goal="Write a detailed quarterly report summarizing key findings from the mutual fund data.",
    backstory="Financial writer with expertise in creating reports from analytical data.",
    llm="gpt-4o-mini"
)

seo_optimizer = Agent(
    role="SEO Optimizer",
    goal="Optimize the report for SEO, focusing on readability and search visibility.",
    backstory="Content strategist with SEO optimization skills for finance content.",
    llm="gpt-4o-mini"
)

# Define Tasks
data_analysis_task = Task(
    description="Analyze the mutual fund data to identify trends, performance metrics, and key insights for the quarter.",
    expected_output="Summary of trends, top-performing funds, underperforming funds, and significant financial metrics.",
    agent=data_analyst
)

report_writing_task = Task(
    description="Write a quarterly report based on the data insights provided by the Data Analyst.",
    expected_output="A well-structured quarterly report summarizing key findings, including an overview of fund performance and trends.",
    agent=report_writer
)

seo_optimization_task = Task(
    description="Optimize the quarterly report for SEO to improve search visibility.",
    expected_output="SEO-optimized quarterly report ready for publication.",
    agent=seo_optimizer
)

# Assemble Crew
crew = Crew(
    tasks=[data_analysis_task, report_writing_task, seo_optimization_task],
    agents=[data_analyst, report_writer, seo_optimizer],
    process=Process.sequential,
    verbose=True
)

# Kickoff Process
result = crew.kickoff()
print(result)

# Save Output to File
file_writer_tool = FileWriterTool()
try:
    file_writer_tool._run(filename='mutual_fund_quarterly_report.txt', content=str(result), directory='./', overwrite='true')
except Exception as e:
    print(f"Error writing file: {str(e)}")