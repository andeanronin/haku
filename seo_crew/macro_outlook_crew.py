# Crew that writes a macro outlook report for the latin american region. 


from crewai import Agent, Crew, Process, Task
from crewai_tools import FileWriterTool, SerplyNewsSearchTool
from dotenv import load_dotenv

load_dotenv()

# Initialize Serply News Search Tool with proxy_location for Latin American-focused news
news_search_tool = SerplyNewsSearchTool(proxy_location="US", limit=15)

# Define Agents
macro_researcher = Agent(
    role="Macroeconomic Researcher for Latin America",
    goal="Provide country-specific and regional macroeconomic data and insights for Latin America.",
    backstory="Experienced macroeconomic analyst specialized in Latin American economies.",
    llm="gpt-4o",
    tools=[news_search_tool]
)

macro_writer = Agent(
    role="Report Writer",
    goal="Write a detailed macroeconomic outlook report per country and a regional summary for Latin America.",
    backstory="Economist and finance writer with a strong background in Latin American markets.",
    llm="gpt-4o"
)

seo_optimizer = Agent(
    role="SEO editor",
    goal="Optimize the macroeconomic report for search engine visibility.",
    backstory="Content strategist with SEO expertise.",
    llm="gpt-4o"
)

# Define Tasks
country_research_task = Task(
    description="Research the latest macroeconomic trends, including GDP, inflation, and employment data for each Latin American country. Use the news search tool to retrieve recent articles and analyses.",
    expected_output="Detailed macroeconomic data and trend summary for each Latin American country.",
    agent=macro_researcher
)

regional_summary_task = Task(
    description="Research regional trends and compile insights across Latin America, focusing on economic integration, trade flows, and overarching economic indicators.",
    expected_output="Summary of regional macroeconomic trends and key data points for Latin America.",
    agent=macro_researcher
)

write_macro_report_task = Task(
    description="Write a comprehensive macroeconomic outlook report, with sections for each Latin American country and an overall regional summary.",
    expected_output="A detailed and SEO-optimized macroeconomic outlook report for Latin America.",
    agent=macro_writer
)

seo_optimization_task = Task(
    description="Enhance the report for SEO to ensure high visibility while maintaining professionalism.",
    expected_output="SEO-optimized macroeconomic outlook report.",
    agent=seo_optimizer
)

# Assemble Crew
crew = Crew(
    tasks=[country_research_task, regional_summary_task, write_macro_report_task, seo_optimization_task],
    agents=[macro_researcher, macro_writer, seo_optimizer],
    process=Process.sequential,  # Tasks can run concurrently where appropriate
    verbose=True
)

# Kickoff Process
result = crew.kickoff()
print(result)

# Save Output to File
file_writer_tool = FileWriterTool()
try:
    file_writer_tool._run(filename='macro_outlook_report.txt', content=str(result), directory='./', overwrite='true')
except Exception as e:
    print(f"Error writing file: {str(e)}")