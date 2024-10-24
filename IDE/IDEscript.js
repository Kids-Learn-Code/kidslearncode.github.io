//DO NOT EDIT THIS SET OF CODE
//ANY EDIT MIGHT CAUSE DISRUPTION TO THE IDE
const output = document.getElementById("output");

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('code'), {
        value: `name = input("Enter your name: ")\nprint("Hello, " + name)`,
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        lineNumbers: "on",
        fontSize: '15px',
    });

    output.value = "Initializing...\n";

    const pythonSuggestions = [
        'def', 'class', 'import', 'from', 'for', 'while', 'if', 'else', 'elif', 'return', 'print', 'input', 'try', 'except',
        'with', 'as', 'True', 'False', 'None', 'list', 'dict', 'set', 'tuple', 'int', 'float', 'str', 'len', 'range', 'map',
        'filter', 'lambda', 'open', 'read', 'write', 'append', 'in', 'is', 'not', 'and', 'or', 'break', 'continue', 'pass',
        'global', 'nonlocal', 'yield', 'raise', 'super', 'self', 'init', 'del', 'str', 'repr', 'format', 'abs', 'all', 'any',
        'bin', 'bool', 'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex', 'delattr', 'dir', 'divmod',
        'enumerate', 'eval', 'exec', 'exit', 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash',
        'help', 'hex', 'id', 'input', 'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max', 'min', 'next',
        'object', 'oct', 'ord', 'pow', 'print', 'property', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice',
        'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip', '__name__', '__main__', '__init__',
        '__repr__', '__str__', '__dict__', '__doc__', '__class__', '__module__', '__annotations__', '__call__', '__eq__',
        '__ne__', '__lt__', '__le__', '__gt__', '__ge__', '__hash__', '__len__', '__getitem__', '__setitem__', '__delitem__',
        '__iter__', '__next__', '__contains__', '__add__', '__sub__', '__mul__', '__truediv__', '__floordiv__', '__mod__',
        '__pow__', '__and__', '__or__', '__xor__', '__invert__', '__lshift__', '__rshift__', '__enter__', '__exit__', '__new__',
        '__del__', '__slots__', '__getattr__', '__setattr__', '__getattribute__', '__dir__', '__call__', '__bytes__', '__format__',
        '__sizeof__', '__reduce__', '__reduce_ex__', '__getstate__', '__setstate__', '__copy__', '__deepcopy__', '__import__',
        'importlib', 'sys', 'os', 'path', 'time', 'datetime', 'json', 'csv', 're', 'math', 'random', 'itertools', 'functools',
        'collections', 'decimal', 'fractions', 'heapq', 'bisect', 'copy', 'pprint', 'argparse', 'subprocess', 'shutil', 'glob',
        'urllib', 'requests', 'http', 'http.client', 'socket', 'threading', 'multiprocessing', 'asyncio', 'concurrent.futures',
        'logging', 'warnings', 'contextlib', 'dataclasses', 'pickle', 'shelve', 'sqlite3', 'hashlib', 'hmac', 'base64',
        'xml.etree.ElementTree', 'html.parser', 'beautifulsoup4', 'lxml', 'email', 'imaplib', 'smtplib', 'ssl', 'getpass', 'pathlib',
        'statistics', 'enum', 'typing', 'abc', 'queue', 'struct', 'traceback', 'unittest', 'doctest', 'pytest', 'mypy', 'pdb',
        'cProfile', 'timeit', 'gzip', 'bz2', 'zipfile', 'tarfile', 'secrets', 'uuid', 'ctypes', 'decimal', 'float', 'format',
        'int', 'sum', 'min', 'max', 'round', 'abs', 'math.ceil', 'math.floor', 'math.sqrt', 'math.pow', 'math.sin', 'math.cos',
        'math.tan', 'math.exp', 'math.log', 'math.log10', 'math.pi', 'math.e', 'random.randint', 'random.choice', 'random.shuffle',
        'random.random', 'random.seed', 'enumerate', 'zip', 'map', 'reduce', 'filter', 'sorted', 'all', 'any', 'ascii', 'bin',
        'chr', 'ord', 'bool', 'bytearray', 'complex', 'memoryview', 'frozenset', 'range', 're.match', 're.search', 're.findall',
        're.sub', 'json.dump', 'json.dumps', 'json.load', 'json.loads', 'csv.reader', 'csv.writer', 'csv.DictReader', 'csv.DictWriter',
        'open', 'read', 'write', 'close', 'flush', 'seek', 'tell', 'mode', 'encoding', 'errors', 'subprocess.run', 'subprocess.Popen',
        'shutil.copy', 'shutil.move', 'os.remove', 'os.rename', 'os.makedirs', 'os.listdir', 'os.path.join', 'os.path.exists',
        'os.getenv', 'os.setenv', 'os.path.dirname', 'os.path.abspath', 'time.sleep', 'time.time', 'datetime.datetime.now',
        'datetime.timedelta', 'datetime.date', 'datetime.time', 'itertools.chain', 'itertools.combinations', 'itertools.permutations',
        'functools.lru_cache', 'functools.partial', 'functools.wraps', 'functools.reduce', 'collections.defaultdict', 'collections.Counter',
        'collections.OrderedDict', 'collections.namedtuple', 'collections.deque', 'copy.deepcopy', 'copy.copy', 'contextlib.contextmanager',
        'dataclasses.dataclass', 'dataclasses.field', 'dataclasses.replace', 'pickle.dump', 'pickle.load', 'hashlib.md5', 'hashlib.sha256',
        'logging.debug', 'logging.info', 'logging.warning', 'logging.error', 'logging.critical', 'unittest.TestCase', 'unittest.main',
        'asyncio.run', 'asyncio.gather', 'asyncio.sleep', 'asyncio.create_task', 'await', 'async', 'yield from', 'f-string', 'list comprehension',
        'dictionary comprehension', 'set comprehension', 'generator', 'decorator', 'context manager', 'property', 'getter', 'setter', 'del'
    ];

    monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: function (model, position) {
            const word = model.getWordUntilPosition(position);
            const prefix = word.word.toLowerCase();

            const filteredSuggestions = pythonSuggestions
                .filter(keyword => keyword.toLowerCase().startsWith(prefix))
                .map(keyword => {
                    return {
                        label: keyword,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: keyword,
                        range: {
                            startLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endLineNumber: position.lineNumber,
                            endColumn: word.endColumn
                        }
                    };
                });

            return { suggestions: filteredSuggestions };
        }
    });

    async function main() {
        let pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" });
        output.value += "Ready!\n";
        return pyodide;
    }

    let pyodideReadyPromise = main();

    function addToOutput(s) {
        output.value += ">>> " + s + "\n";
    }

    async function evaluatePython() {
        let pyodide = await pyodideReadyPromise;
        try {
            const code = editor.getValue();
            console.log(code);
            pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()

# Define a custom input function
def input(prompt=""):
    sys.stdout.write(prompt)
    user_input = js_input(prompt)
    sys.stdout.write(user_input + "\\n")  # Include the input in the output
    return user_input
`);

            pyodide.globals.set("js_input", (prompt) => {
                let userInput = window.prompt(prompt);
                return userInput || "";
            });

            let outputValue = pyodide.runPython(code);

            let printedOutput = pyodide.runPython("sys.stdout.getvalue()");

            addToOutput(printedOutput + (outputValue ? outputValue : ""));
        } catch (err) {
            console.error(err);
            addToOutput(err);
        }
    }

    document.getElementById('run').addEventListener('click', evaluatePython);
});

function promptUser(prompt) {
    return window.prompt(prompt);
}