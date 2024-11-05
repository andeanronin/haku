# Crew that writes educational content about investing in peru

from crewai import Agent, Crew, Process, Task
from dotenv import load_dotenv
from crewai_tools import FileWriterTool
import os

load_dotenv()

cwd = os.getcwd()
print(cwd)


seo_writer_agent = Agent(
    role = "seo writer",
    goal = "write educational content about investing in peru",
    backstory = "writer with expertise in writing content about finance and investing in peru and latin american for search engine optimization",
    llm = "gpt-4o-mini"
)

write_blog_task = Task(
    description="""
        Write educational guide, in spanish, about how to invest in ETF and Mutual Fund Vehicles in Peru.
    """,
    expected_output="""
        A 500 word guide about investing in peru written in spanish. 
    """,
    agent=seo_writer_agent
)

crew = Crew(
    tasks=[write_blog_task],
    agents=[seo_writer_agent],
    process=Process.sequential,
    verbose=True,
)

result = crew.kickoff()
print(result)

file_writer_tool = FileWriterTool()

try:
    result = file_writer_tool._run(filename='ed_blog.txt', content=str(result), directory='./', overwrite='true')

except Exception as e:
    print(f"Error writing file: {str(e)}")
    print(f"Result type: {type(result)}")
    print(f"Result content: {result}")