# crew that writes a professianal and expert news bulletin summarizing financial news and market trends focused in peru and latam.

from crewai import Agent, Crew, Process, Task
from crewai_tools import FileWriterTool, SerplyNewsSearchTool 
from dotenv import load_dotenv

load_dotenv()

news_search_tool = SerplyNewsSearchTool(proxy_location="US", limit=15)


# Define Agents

financial_news_correspondent = Agent(
    role="Financial news correspondent for latin america",
    goal="Provide data and summary insights on latin american and peruvian financial markets and trends and news.",
    backstory="Experienced financial news correspondent especialized in Latin American markets.",
    llm="gpt-4o",
    tools=[news_search_tool]
)

writer_agent = Agent(
    role="Writer",
    goal="Write professional newsletters focused on latin american financial markets.",
    backstory="Veteran finance writer with expertise in Latin American markets.",
    llm="gpt-4o"
)

seo_optimizer = Agent(
    role="SEO editor agent",
    goal="Edit newsletter with search engine optimization to the text and its format.",
    backstory="Content writer with seo expertise.",
    llm="gpt-4o"
)

# Define Tasks
research_task = Task(
    description="Research the latest information on financial markets, ETFs, and mutual funds in Peru and Latin America. Use the news search tool to retrieve the latest articles.",
    expected_output="Summary of recent trends and news relating to the peruvian and latin american financial market, ETFs and mutual funds, and relevant financial data.",
    agent=financial_news_correspondent
)

write_news_bulletin_task = Task(
    description="Write a one thousand word newsletter summarizing financial trends and news in latin america.",
    expected_output="One thousand word newsletter summarizing financial trends and news. Provide links to top stories referrenced.",
    agent=writer_agent
)

seo_optimization_task = Task(
    description="Make edits that optimize the newsletter for Search Engine Optimization.",
    expected_output="Newsletter with the SEO optimizations.",
    agent=seo_optimizer
)

# Assemble Crew
crew = Crew(
    tasks=[research_task, write_news_bulletin_task, seo_optimization_task],
    agents=[financial_news_correspondent, writer_agent, seo_optimizer],
    process=Process.sequential,  # Tasks can run concurrently where appropriate
    verbose=True
)

# Kickoff Process
result = crew.kickoff()
print(result)

# Save Output to File
file_writer_tool = FileWriterTool()
try:
    file_writer_tool._run(filename='finance_newsletter.txt', content=str(result), directory='./', overwrite='true')
except Exception as e:
    print(f"Error writing file: {str(e)}")