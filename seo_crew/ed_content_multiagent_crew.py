# multi agent educational content seo crew

from crewai import Agent, Crew, Process, Task
from crewai_tools import FileWriterTool
from dotenv import load_dotenv

load_dotenv()

# Define Agents
seo_writer_agent = Agent(
    role="SEO writer",
    goal="Create SEO-optimized educational content about investing in Peru",
    backstory="Finance content writer with expertise in Latin American markets.",
    llm="gpt-4o"
)

financial_analyst_agent = Agent(
    role="Financial analyst",
    goal="Provide data and insights on Peruvian ETFs and mutual funds",
    backstory="Experienced financial analyst familiar with Latin American markets.",
    llm="gpt-4o"
)

editor_agent = Agent(
    role="Content editor",
    goal="Edit for readability, clarity, and tone",
    backstory="Editor with experience in financial content for Latin America.",
    llm="gpt-4o"
)

# Define Tasks
research_task = Task(
    description="Research the latest information on ETFs and mutual funds in Peru.",
    expected_output="Summary of recent trends, top ETFs and mutual funds, and relevant financial data.",
    agent=financial_analyst_agent
)

write_blog_task = Task(
    description="Write a 500-word educational guide in Spanish on investing in ETFs and mutual funds in Peru.",
    expected_output="SEO-optimized guide covering key points about Peruvian ETFs and mutual funds.",
    agent=seo_writer_agent
)

proofread_task = Task(
    description="Proofread and improve the blog post for readability and flow.",
    expected_output="Edited guide with enhanced clarity and flow.",
    agent=editor_agent
)

# Assemble Crew
crew = Crew(
    tasks=[research_task, write_blog_task, proofread_task],
    agents=[financial_analyst_agent, seo_writer_agent, editor_agent],
    process=Process.sequential,  # Tasks can run concurrently where appropriate
    verbose=True
)

# Kickoff Process
result = crew.kickoff()
print(result)

# Save Output to File
file_writer_tool = FileWriterTool()
try:
    file_writer_tool._run(filename='ed_blog_multi.txt', content=str(result), directory='./', overwrite='true')
except Exception as e:
    print(f"Error writing file: {str(e)}")