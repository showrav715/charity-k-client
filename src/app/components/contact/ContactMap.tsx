

export default function ContactMap({ map_link }: { map_link: string }) {
  return (
    <div className="ch-contact-map" >
      <div className="container">
        <iframe
          src={map_link}
          width="100%"
          height="800"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
