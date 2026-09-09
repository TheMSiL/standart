interface JsonLdProps {
  /** A schema.org object, or an array of them. */
  data: object | object[];
  id?: string;
}

/**
 * Emits structured data.
 *
 * `</script>` inside a string value would otherwise close the tag early, so the
 * forward slash is escaped. The payload is always built server-side from typed
 * content, never from user input.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      // Structured data must be emitted as raw JSON; the payload is built
      // server-side from typed content and escaped above.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
